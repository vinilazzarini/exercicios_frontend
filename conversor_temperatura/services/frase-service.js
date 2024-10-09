export async function conselho(){
    const URL = `https://api.kanye.rest`

    try{
        const response = await fetch(URL)
        const dados = await response.json()
        return dados.quote
    }catch(erro){
        console.log(erro);
    }
}