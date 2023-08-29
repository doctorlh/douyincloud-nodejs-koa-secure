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
	router.post('/api/text/secure', async (ctx) => {
		const body : any = ctx.request.body;
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
		const appid = "tt28945e29b7a80c7a01"
		const tokenRes = await axios.post('http://developer.toutiao.com/api/apps/v2/token', {
			"appid": appid,
			"secret": '9ea5904d24e76fe548dab5d764b00e56ebce7d2d',
			"grant_type": 'client_credential'
		})
		const { access_token } = tokenRes.data.data
		
		const body : any = ctx.request.body;
		const { image, image_data } = body;
		const res = await axios.post('http://developer.toutiao.com/api/apps/censor/image', {
			"app_id": appid,
			"access_token": access_token,
			"image": image,
			"image_data": image_data
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

}).catch((error : string) => console.log("Init service  error: ", error));