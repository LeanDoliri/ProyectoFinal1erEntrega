const { promises: fs } = require('fs')

class ContenedorArchivo {

    constructor(path) {
        this.path = path;
    }

    async listar(id) {
        try {
            const read = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(read);
            const element = data.find(element => id === element.id);

            if(!element){
                return null;
            } return element;
        } catch (error) {
            console.log(error);
        }
    }

    async listarAll() {
        try {
            const read = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(read);
        } catch (error) {
            console.log(error);
        }
    }

    async guardar(element) {
        try {
            const read = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(read);

            const arrayOfIds = data.map((element) => element.id);
            const maxId = arrayOfIds.length === 0 ? 0 : Math.max(...arrayOfIds);
            const id = maxId + 1;
            const newElement = { id, ...element };
            data.push(newElement);

            await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');

            return newElement;
        } catch (error) {
            console.log(error);
        }
    }

    async actualizar(element, id) {
        try {
            const read = await fs.readFile(this.path, 'utf-8');
            let data = JSON.parse(read);

            const filteredElements = data.filter((element) => element.id !== id);
            const newElement = { id, ...element };
            data = [...filteredElements, newElement];
                
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');

            return newElement;
        } catch (error) {
            console.log(error);
        } 
    }

    async borrar(id) {
        try {
            const read = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(read);

            const newData = data.filter(element => element.id != id);
            await fs.writeFile(this.path, JSON.stringify(newData, null, 2), 'utf-8');

            return newData;
        } catch (error) {
            console.log(error);
        }
    }

    async borrarAll() {
        try {
            await fs.writeFile(this.path, JSON.stringify([], null, 2), 'utf-8');
            return await fs.readFile(this.path, 'utf-8');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorArchivo;