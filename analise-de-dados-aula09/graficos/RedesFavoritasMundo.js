import { getCSS, criarGrafico, incluirTexto } from "./common.js"

async function ferramentasFavoritasTratador() {
    const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/ferramentas-favoritas.json' // Alterado o URL para corresponder a uma API fictícia de ferramentas
    const res = await fetch(url)
    const dados = await res.json()
    const ferramentas = Object.keys(dados)
    const valores = Object.values(dados)

    const data = [
        {
            values: valores,
            labels: ferramentas,
            type: 'pie',
            textinfo: 'label+percent'
        }
    ]

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        height: 700,
        title: {
            text: 'Ferramentas favoritas dos tratadores',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                family: getCSS('--font'),
                size: 30
            }
        },
        legend: {
            font: {
                color: getCSS('--primary-color'),
                size: 16
            }
        }
    }

    criarGrafico(data, layout)

    incluirTexto(`Embora o <span>Arado</span> seja uma ferramenta essencial para várias operações agrícolas, o <span>Trator</span> se destaca como a <span>preferida dos tratadores</span>, superando até mesmo o <span>Cultivador</span> e outras ferramentas. Isso ressalta a importância e a versatilidade do trator nas atividades diárias dos tratadores.`)
}

ferramentasFavoritasTratador()
