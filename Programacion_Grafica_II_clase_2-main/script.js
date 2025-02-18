// Escena, cámara y renderizador
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizador = new THREE.WebGLRenderer({ antialias: true }); // Mejor calidad gráfica
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizador.domElement);

// colocar un fondo de color

escena.background = new THREE.Color(0x001a33);

// aumento de una fuente de luz para poder realizar un reflejo en el cilindro 

const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5);
escena.add(luzAmbiente);

const luzDireccional = new THREE.DirectionalLight(0xffffff, 1);
luzDireccional.position.set(2, 2, 5);
escena.add(luzDireccional);

// Crear un cilindro con color degradado
const geometría = new THREE.CylinderGeometry(1, 1, 2, 32);
const material = new THREE.MeshStandardMaterial({ 
    color: 0xff5733, 
    metalness: 0.6,  
    roughness: 0.2   // el que refleje luz
});
const cilindro = new THREE.Mesh(geometría, material);
escena.add(cilindro);

// Posicionar la cámara

camara.position.z = 5;

let tiempo = 0;

// Animación del cilindro
function animacion() {
    requestAnimationFrame(animacion);

    // rotacion
    cilindro.rotation.x += 0.02;
    cilindro.rotation.y += 0.02;

    // un acercamiento pulsante continuo
    tiempo += 0.05;
    const escala = 1 + Math.sin(tiempo) * 0.3;
    cilindro.scale.set(escala, escala, escala);

    renderizador.render(escena, camara);
}

animacion();

// esto para ajustar el tamañao de la ventana si es que se cambia

window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});
