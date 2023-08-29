let cat = document.getElementById('cat');
cat.style.position = 'fixed';

document.onmousemove = (event) => {
    cat.style.left = event.clientX - 75 + 'px';
    cat.style.top = event.clientY - 75 + 'px';
}

setTimeout(Cat, 1000);

function Cat()
{
    cat.onmouseover = () => alert('хи-хи попався!!')
}