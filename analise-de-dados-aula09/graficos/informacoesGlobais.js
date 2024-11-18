const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/dados-tratadores.json'

async function vizualizarInformacoesAgricolas() {
    const res = await fetch(url)
    const dados = await res.json()
    const totalTratores = (dados.total_tratores / 1e6).toFixed(1)
    const totalFazendas = (dados.total_fazendas / 1e6).toFixed(1)
    const horas = parseInt(dados.tempo_medio_uso)
    const minutos = Math.round((dados.tempo_medio_uso - horas) * 100)
    const porcentagemUso = ((dados.tratores_em_uso / dados.total_tratores) * 100).toFixed(2)

    const paragrafo = document.createElement('p')
    paragrafo.classList.add('graficos-container__texto')
    paragrafo.innerHTML = `Sabia que existem aproximadamente <span>${totalTratores} milhões</span> de tratores em operação ao redor do mundo, distribuídos em cerca de <span>${totalFazendas} milhões</span> de fazendas? Em média, um trator é utilizado por <span>${horas} horas</span> e <span>${minutos} minutos</span> diariamente.<br>Isso significa que cerca de <span>${porcentagemUso}%</span> dos tratores estão em uso ativo em qualquer momento.`

    const container = document.getElementById('graficos-container')
    container.appendChild(paragrafo)
}

vizualizarInformacoesAgricolas()
