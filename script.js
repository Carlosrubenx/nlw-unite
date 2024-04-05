let participantes = [
    {
        nome: "Rubens",
        email: "rubens@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 30, 17, 35)
    },
    {
        nome: "Diego",
        email: "diego@gmail.com",
        dataInscricao: new Date(2024, 2, 23, 20, 25),
        dataCheckIn: null
    },
    {
        nome: "Maria",
        email: "maria@gmail.com",
        dataInscricao: new Date(2024, 2, 21, 18, 45),
        dataCheckIn: new Date(2024, 2, 27, 10, 50)
    },
    {
        nome: "João",
        email: "joao@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 15, 30),
        dataCheckIn: null
    },
    {
        nome: "Ana",
        email: "ana@gmail.com",
        dataInscricao: new Date(2024, 2, 20, 12, 10),
        dataCheckIn: new Date(2024, 2, 25, 14, 20)
    },
    {
        nome: "Carlos",
        email: "carlos@gmail.com",
        dataInscricao: new Date(2024, 2, 23, 9, 55),
        dataCheckIn: new Date(2024, 2, 28, 16, 45)
    },
    {
        nome: "Fernanda",
        email: "fernanda@gmail.com",
        dataInscricao: new Date(2024, 2, 21, 14, 40),
        dataCheckIn: new Date(2024, 2, 22, 11, 30)
    },
    {
        nome: "Pedro",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2024, 2, 23, 17, 20),
        dataCheckIn: new Date(2024, 2, 22, 15, 5)
    },
    {
        nome: "Camila",
        email: "camila@gmail.com",
        dataInscricao: new Date(2024, 2, 20, 20, 15),
        dataCheckIn: new Date(2024, 2, 27, 12, 40)
    },
    {
        nome: "Lucas",
        email: "lucas@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 13, 50),
        dataCheckIn: new Date(2024, 2, 25, 8, 25)
    }
];

console.log(participantes);


const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

    if(participante.dataCheckIn == null) {
        dataCheckIn = `
            <button onclick="fazerCheckIn(event)" data-email="${participante.email}">Confirmar check-in</button>
        `
    }
    
    return `
    <tr>
        <td>
            <strong>${participante.nome}</strong>
            <br>
            <small>${participante.email}</small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
`;
}

const atualizarLista = (participantes) => {
    let output = "";

    for(let participante of participantes) {
        output = output + criarNovoParticipante(participante);
    };

    document.querySelector('tbody').innerHTML = output;
}

atualizarLista(participantes);

const adicionarParticipante = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target)

    const participante = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null,
    }

    //Verificar se o participante já existe
    const participanteExiste = participantes.find((p) => {
        return p.email = participante.email
    })

    if(participanteExiste) {
        alert("Email já cadastrado!")
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes);

    //Limpar form
    event.target.querySelector('[name="nome"]').value = "";
    event.target.querySelector('[name="email"]').value = "";
}

const fazerCheckIn = (event) => {
    //confirmar check in
    const messageConfirm = "Tem certeza que deseja fazer a confirmação ?"
    if(confirm(messageConfirm) == false) {
        return 
    }

    //encontar o part dentro da lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email 
    })
    //atualizar o check in do part
    participante.dataCheckIn = new Date()
    //atualizar a lista de parts
    atualizarLista(participantes)
}