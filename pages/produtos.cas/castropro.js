// Importa o Firebase e o módulo de banco de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Configuração do Firebase (substitua pelos dados do seu projeto)
const firebaseConfig = {
    apiKey: "AIzaSyCrzaLR01sv0dqt9cJw1NHW7NS4HWEH880",
    authDomain: "self-38e96.firebaseapp.com",
    databaseURL: "https://self-38e96-default-rtdb.firebaseio.com",
    projectId: "self-38e96",
    storageBucket: "self-38e96.appspot.com",
    messagingSenderId: "824378269133",
    appId: "1:824378269133:web:3ccc0c50bb745eb9253884"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Seleciona os elementos do DOM
let codigo = document.getElementById('codigo');
let produto = document.getElementById('produto');
let categoria = document.getElementById('categoria');
let quantidade = document.getElementById('quantidade');
let valor = document.getElementById('valor');

let idProduto = document.getElementById('idProduto');
let dadoProduto = document.getElementById('dadoProduto');
let dadoCategoria = document.getElementById('dadoCategoria');
let dadoQuantidade = document.getElementById('dadoQuantidade');
let dadoValor = document.getElementById('dadoValor');

let cadastrarProduto = document.getElementById('cadastrarProduto');
let buscarProduto = document.getElementById('buscarProduto');
let atualizarProduto = document.getElementById('atualizarProduto');
let deletarProduto = document.getElementById('deletarProduto');

// Função para adicionar produto
function AddProduto() {
    set(ref(db, 'Produto/' + codigo.value), {
        codigo: codigo.value,
        produto: produto.value,
        categoria: categoria.value,
        quantidade: quantidade.value,
        valor: valor.value
    }).then(() => {
        codigo.value = '';
        produto.value = '';
        categoria.value = '';
        quantidade.value = '';
        valor.value = '';
        alert("Produto cadastrado com sucesso!");
    }).catch((error) => {
        console.log(error);
        alert('Erro ao cadastrar o produto.');
    });
}

// Função para pesquisar produto
function PesquisarProduto() {
    const dbRef = ref(db);
    get(child(dbRef, 'Produto/' + idProduto.value)).then((snapshot) => {
        if (snapshot.exists()) {
            dadoProduto.value = snapshot.val().produto;
            dadoCategoria.value = snapshot.val().categoria;
            dadoQuantidade.value = snapshot.val().quantidade;
            dadoValor.value = 'R$ ' + parseFloat(snapshot.val().valor).toFixed(2);
            alert('Produto encontrado!');
        } else {
            alert('Produto não encontrado.');
        }
    }).catch((error) => {
        console.log(error);
        alert('Erro ao buscar o produto.');
    });
}

// Função para atualizar produto
function AtualizarProduto() {
    update(ref(db, 'Produto/' + idProduto.value), {
        produto: dadoProduto.value,
        categoria: dadoCategoria.value,
        quantidade: dadoQuantidade.value,
        valor: dadoValor.value
    }).then(() => {
        alert('Produto atualizado com sucesso!');
    }).catch((error) => {
        console.log(error);
        alert('Erro ao atualizar o produto.');
    });
}

// Função para deletar produto
function DeletarProduto() {
    remove(ref(db, 'Produto/' + idProduto.value)).then(() => {
        idProduto.value = '';
        dadoProduto.value = '';
        dadoCategoria.value = '';
        dadoQuantidade.value = '';
        dadoValor.value = '';
        alert('Produto deletado com sucesso!');
    }).catch((error) => {
        console.log(error);
        alert('Erro ao deletar o produto.');
    });
}

// Adiciona eventos aos botões
cadastrarProduto.addEventListener('click', AddProduto);
buscarProduto.addEventListener('click', PesquisarProduto);
atualizarProduto.addEventListener('click', AtualizarProduto);
deletarProduto.addEventListener('click', DeletarProduto);
