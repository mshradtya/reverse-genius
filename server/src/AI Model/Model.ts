import axios from 'axios';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanMessage, SystemMessage } from 'langchain/schema';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

const AIOpen = async (type: string, code: string) => {
	const chat = new ChatOpenAI({
		temperature: 0.0,
		azureOpenAIApiKey: '1c3379a169ea4ccbad92ea863be5f9c4', // In Node.js defaults to process.env.AZURE_OPENAI_API_KEY
		azureOpenAIApiVersion: '2023-05-15', // In Node.js defaults to process.env.AZURE_OPENAI_API_VERSION
		azureOpenAIApiInstanceName: 'ti-openai-inst', // In Node.js defaults to process.env.AZURE_OPENAI_API_INSTANCE_NAME
		azureOpenAIApiDeploymentName: 'ti-gpt-35-turbo-16k' // In Node.js defaults to process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME
	});

	try {
		const resp = await chat
			.call([new SystemMessage(`You are a ${type} Developer.`), new HumanMessage(`explain the below code in breif \n ${code}`)])
			.then(async (res: any) => {
				return res.lc_kwargs.content;
			})
			.catch((err) => {
				console.log(err);
			});

		return resp;
	} catch (error) {
		console.error(`Error Getting Explanation Excel file :`, error);
	}
};

export default { AIOpen };
