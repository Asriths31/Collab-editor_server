import { GoogleGenerativeAI } from "@google/generative-ai"


export async function chatBot(req,res){
    
   try{ const {docId,content,userQue}=req.body
    const genAi=new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model=genAi.getGenerativeModel({model:"gemini-2.5-flash"})

    const prompt = `
      INSTRUCTIONS:
      You are an AI assistant in a collaborative editor. Use the following document context 
      to answer the user question accurately. 

      DOCUMENT CONTEXT:
      """
      ${content}
      """

      USER QUESTION: ${userQue}
    `
    const result=await model.generateContent(prompt)
    const response=result.response.text()

    res.status(200).json({message:"response success",data:response})
}

catch(error){
    console.log("Error in ChatBot",error)
    return res.status(500).json({message:"Internal Server Error"})
}

}