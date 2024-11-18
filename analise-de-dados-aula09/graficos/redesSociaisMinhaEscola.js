import { criarGrafico, getCSS, incluirTexto } from "./common.js"

async function equipamentosAgricolasPreferidos() {
    const dadosLocaisString = localStorage.getItem('respostaEquipamentosAgricolas')
    if (dadosLocaisString) {
        const dadosLocais = JSON.parse(dadosLocaisString)
        processarDados(dadosLocais)
    } else {
        const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=rSe23zaQC7gOvWgFJbdtPaqh7ewsO5hQmusYOeqdorTRN8C25vVV3BicsPoS6HS3jnJY9NHhy_pNZj6prQdxDH3305Mro8vNm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPvESZ9fvnAeFWqfIvIacdoRZcVMZ-nDSydw9_0gseo2TN3y60rOTtwDBCYnKQf6yIqgf8yOzNfccjP633C9VnHmUmPZvRBJY9z9Jw9Md8uu&lib=MCARBaBtNBMHKiEwMeRap3j6V_G7SlGWF'
        const res = await fetch(url)
        const dados = await res.json()
        localStorage.setItem('respostaEquipamentosAgricolas', JSON.stringify(dados))
        processarDados(dados)
    }
}

function processarDados(dados) {
    const tiposEquipamentos = dados.slice(1).map(equipamento => equipamento[1])
    const contagemEquipamentos = tiposEquipamentos.reduce((acc, tipo) => {
        acc[tipo] = (acc[tipo] || 0) + 1
        return acc
    }, {})
    const valores = Object.values(contagemEquipamentos)
    const labels = Object.keys(contagemEquipamentos)

    const data = [
        {
            values: valores,
            labels: labels,
            type: 'pie',
            textinfo: 'label+percent'
        }
    ]

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        height: 700,
        title: {
            text: 'Tipos de equipamentos agrícolas preferidos pelos trabalhadores',
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
    incluirTexto(`Na amostra entrevistada, observamos uma preferência pelo uso de <span>tratores de grande porte</span> para tarefas intensivas, em comparação com outros tipos de equipamentos agrícolas.`)
}

equipamentosAgricolasPreferidos()
