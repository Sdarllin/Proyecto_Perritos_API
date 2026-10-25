// Selección de elementos del DOM
const dogImage = document.getElementById('dog-image');
const loader = document.getElementById('loader');
const btnNewDog = document.getElementById('btn-new-dog');

// URL de la API pública de perros
const API_URL = 'https://dog.ceo/api/breeds/image/random';

async function fetchDogImage() {
    // 1. Mostrar estado de carga antes de pedir la imagen
    dogImage.style.display = 'none';
    loader.style.display = 'block';
    btnNewDog.disabled = true;
    btnNewDog.textContent = 'Buscando...';

    try {
        // 2. Hacer la petición a la API
        const response = await fetch(API_URL);
        const data = await response.json();

        // 3. Crear una imagen temporal en memoria para precargarla
        // Esto evita que se vea cómo la imagen "parpadea" mientras se dibuja
        const img = new Image();
        img.src = data.message;

        img.onload = () => {
            // Cuando la imagen está 100% descargada, la mostramos
            dogImage.src = data.message;
            loader.style.display = 'none';
            dogImage.style.display = 'block';
            
            // Restauramos el botón a su estado normal
            btnNewDog.disabled = false;
            btnNewDog.textContent = '¡Ver otro perrito!';
        };
        
        img.onerror = () => {
            throw new Error('Error al cargar la imagen en el navegador');
        };

    } catch (error) {
        console.error('Error obteniendo la imagen:', error);
        loader.style.display = 'none';
        btnNewDog.disabled = false;
        btnNewDog.textContent = 'Intentar de nuevo';
        alert('Hubo un problema al cargar el perrito. Revisa tu conexión a internet.');
    }
}

// Escuchar el clic en el botón para ejecutar la función
btnNewDog.addEventListener('click', fetchDogImage);

// Llamar a la función inmediatamente para mostrar un perro al abrir la página
fetchDogImage();