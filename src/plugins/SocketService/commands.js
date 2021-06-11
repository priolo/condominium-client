/* eslint eqeqeq: "off"*/


export class Commands {
	
	constructor(server) {
		this.server = server
	}

	table = {

		"ping": payload => this.server.ping.onMessage(),

		"command": param => {
			console.log(param)
		},

	}
	/**
	 * 
	 * @param {*} data 
	{
		subject:string 	// identifica il comando da eseguire
		activity:any	// sono i parametri del comando
	}
	 * @returns 
	 */
	exe(data) {
		const cmm = this.table[data.subject]
		if (!cmm) return
		cmm(data.activity);
	}
}

