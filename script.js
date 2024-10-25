document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;

    if (eventName && eventDate) {
        adicionarEvento(eventName, eventDate);
        document.getElementById('eventForm').reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

function adicionarEvento(nome, data) {
    const eventContainer = document.getElementById('eventContainer');
    
    const eventItem = document.createElement('div');
    eventItem.classList.add('event-item');

    const eventDetails = document.createElement('div');
    eventDetails.innerHTML = `<h3>${nome}</h3><span>Data: ${data}</span>`;

    const tempoRestante = document.createElement('span');
    tempoRestante.innerHTML = calcularTempoRestante(data);

    eventItem.appendChild(eventDetails);
    eventItem.appendChild(tempoRestante);

    eventContainer.appendChild(eventItem);

    setInterval(function() {
        tempoRestante.innerHTML = calcularTempoRestante(data);
    }, 60000); 
}

function calcularTempoRestante(dataEvento) {
    const dataAtual = new Date();
    const dataEventoObj = new Date(dataEvento);

    const diffMs = dataEventoObj - dataAtual;
    if (diffMs < 0) {
        return 'Evento já passou';
    }

    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${dias} dias, ${horas} horas, e ${minutos} minutos restantes`;
}
