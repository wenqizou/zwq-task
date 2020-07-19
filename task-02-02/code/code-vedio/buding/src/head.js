export default () => {
    const ele = document.createElement('h2')

    ele.textContent = "hello world"
    ele.addEventListener('click', () => {
        alert(111)
    })
    return ele
}