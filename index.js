const request = require('request-promise');
let scoreMudar = 0;
let scoreNaoMudar = 0;
let tentativasMudar = 0;
let tentativasNaoMudar = 0;
for(let i = 0; i < 100; i++) {
	escolherPorta(true).then(porta => {
		tentativasMudar++;
		if(porta) {
			scoreMudar++;
			console.log(`Porcentage de acertos mudando de porta: ${((scoreMudar/tentativasMudar)*100).toFixed(1)}%`);
		}
	});
	escolherPorta(false).then(porta => {
		tentativasNaoMudar++;
		if(porta) {
			scoreNaoMudar++;
			console.log(`Porcentage de acertos não mudando de porta: ${((scoreNaoMudar/tentativasNaoMudar)*100).toFixed(1)}`);
		}
	})
}

async function definirPorta() {
	let portas = [false, false, false]
	try {
		let req = await getRandomNumber(0, 3);
		portas.forEach((e, i) => {
			portas[i] = false;
			if(i == req) portas[i] = true; 
		})
		return {portas, req};
	} catch(err) {
		console.log(err)
	}
}
async function escolherPorta(mudar) {
	let opts = await definirPorta();
	let random = await getRandomNumber(0, 3);
	let player = opts.portas[random]; 
	let novasPortas = opts.portas.filter((elem, index) => index != random);
	
	// tira uma porta errrada
	if(novasPortas[0] == false) {
		novasPortas = novasPortas.filter((elm, i) => i != 0);
	} else {
		novasPortas = novasPortas.filter((elm, i) => i != 1);
	}
	
	novasPortas.push(player); // vai ser o ultimo index

	if(mudar) {
		return novasPortas[0];
	} else {
		return novasPortas[1];
	}
}
async function getRandomNumber(min, max) {
	let r = Math.floor(Math.random() * (max - min) + min)
	return r;
}