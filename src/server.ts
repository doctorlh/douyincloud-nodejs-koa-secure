import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'
import axios from 'axios';


async function initService() {
	return true
}


initService().then(async () => {

	const app = new Koa();

	const router = new Router();
	router.post('/api/text/antidirt', async (ctx) => {
		const body: any = ctx.request.body;
		const content = body.content;
		const res = await axios.post('http://developer.toutiao.com/api/v2/tags/text/antidirt', {
			"tasks": [{
				"content": content
			}]
		});
		ctx.body = {
			"result": res.data,
			"success": true,
		}
	}).post('/api/image/secure', async (ctx) => {
		const body: any = ctx.request.body;
		const content = body.content;
		const res = await axios.post('https://open.douyin.com/api/apps/v1/censor/image', {
			"image_data": content
		});
		ctx.body = {
			"result": res.data,
			"success": true,
		}
	});

	app.use(bodyParser());
	app.use(router.routes());

	const PORT = 8000;
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});

}).catch((error: string) => console.log("Init service  error: ", error));