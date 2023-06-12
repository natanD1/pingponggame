// Variaveis criada para definir a posição, largura e comprimento da raquete do Computador

let xRaquetePC = 585; // Posição X da raquete
let yRaquetePC = 150; // Posição Y da raquete
let velocidadeYRaquetePC = 6; // Velocidade da raquete PC

// Variaveis criada para definir a posição da raquete do Player

let xRaquetePlayer = 5; // Posição X da raquete
let yRaquetePlayer = 150; // Posição Y da raquete

// Chance de errar
let chanceDeErrar = 0;

// Dimensões da raquete

let wRaquete = 10; // Largura da raquete
let hRaquete = 90; // Conprimento da raquete

let colidiu = false;

// Placar do Jogo

let playerPonto = 0; // Pontos do jogador
let pcPonto = 0; // Pontos do computador

// Variaveis criada para definir a posição e o tamanho da bolinha

let xBolinha = 300; // Posição X da bolinha
let yBolinha = 200; // Posição Y da bolinha
let diametro = 13; // Diametro da Bolinha

// Variavel do raio da bolinha

let raio = diametro / 2;

// Variveis criada para definir a velocidade da bolinha no eixo X e eixo Y

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("./assets/trilha.mp3")
  ponto = loadSound("./assets/ponto.mp3")
  raquetada = loadSound("./assets/raquetada.mp3")
}

// Sintaxe criada para definir o espaço da tela

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  
  movimentaRaquetePlayer();
  movimentaRaquetePC();
  
  mostraRaquete(xRaquetePlayer, yRaquetePlayer);
  mostraRaquete(xRaquetePC, yRaquetePC);
  
  colisaoRaquete(xRaquetePlayer,yRaquetePlayer);
  colisaoRaquete(xRaquetePC, yRaquetePC);
  
  incluiPlacar();
  
  marcaPonto();
  
  calculaChanceDeErrar()
  
}

// Mostrando a bolinha

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

// Movimentando a bolinha

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

// Verifica a colisão da bolinha quando bate nas bordas

function verificaColisaoBorda(){
  
// Sintaxe para a colisão da bolinha para as bordas
  
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  } 
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

// Mostrando a raquete do jogador

function mostraRaquete(x,y) {
  rect(x, y, wRaquete, hRaquete);
}

// Mostrando a raquete do Computador

function movimentaRaquetePlayer() {
  
  if (keyIsDown(UP_ARROW)) {
    yRaquetePlayer -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    yRaquetePlayer += 10;
    
  }
}

// Verifica a colisião da bolinha na raquete e na borda

function colisaoRaquete(x,y) {
  
  colidiu = collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio);
  
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
    
  }
}

function movimentaRaquetePC(){
  velocidadeYRaquetePC = yBolinha - yRaquetePC - wRaquete / 2 - 70;
  
  yRaquetePC += velocidadeYRaquetePC + chanceDeErrar
  calculaChanceDeErrar()
}

function incluiPlacar() {
  textAlign(CENTER);
  textSize(16);
  fill(color(144, 238, 144));
  rect(150, 10, 40, 20);
  fill(255);
  text(playerPonto, 170, 26);
  fill(color(144, 238, 144));
  rect(450, 10, 40, 20);
  fill(255);
  text(pcPonto, 470, 26);
}

function marcaPonto() {
  
  if (xBolinha > 590){
    playerPonto += 1;
    ponto.play();
  }
  
  if (xBolinha < 10){
    pcPonto += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pcPonto >= playerPonto) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}


