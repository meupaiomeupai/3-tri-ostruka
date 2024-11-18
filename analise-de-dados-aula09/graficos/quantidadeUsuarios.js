import { getCSS, tickConfig, criarGrafico } from "./common.js"

async function quantidadeEquipamentosPorRegiao() {
    const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/numero-equipamentos.json'
    const res = await fetch(url)
    const dados = await res.json()
    const nomeDasRegioes = Object.keys(dados)
    const quantidadeDeEquipamentos = Object.values(dados)

    const data = [
        {
            x: nomeDasRegioes, 
            y: quantidadeDeEquipamentos, 
            type: 'bar',
            marker: {
                color: getCSS('--primary-color')
            }
        }
    ]

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        title: {
            text: 'Distribuição de Tratores e Equipamentos por Região',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                family: getCSS('--font'),
                size: 30
            }
        },
        xaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Regiões Agrícolas',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        },
        yaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Equipamentos em uso (milhões)',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        }
    }

    criarGrafico(data, layout)
}

quantidadeEquipamentosPorRegiao()
