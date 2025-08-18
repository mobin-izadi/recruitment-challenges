const factureWrapper = document.querySelector('.facture-wrapper')
const totalPriceElem = document.querySelector('.total-price')
const printBtn = document.querySelector('.print-btn')
const factureTable = document.querySelector("table");



window.addEventListener('load', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    factureWrapper.innerHTML = ''
    allPrice = cart.reduce((acc, product) => {
        return acc + (product.price * product.count);
    }, 0)
    totalPriceElem.innerHTML = `${allPrice.toLocaleString('fa-ir')} تومان`
    cart.forEach((product, index) => {
        factureWrapper.insertAdjacentHTML('beforebegin', `
            
            <tr class="border-b border-gray-200 dark:border-gray-700">
                            <td class="px-6 py-4">
                                ${index + 1}
                            </td>
                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                ${product.title}
                            </th>
                            <td class="px-6 py-4">
                                ${product.count}
                            </td>
                            <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                ${product.price.toLocaleString('fa-ir')} تومان
                            </td>
                            <td class="px-6 py-4">
                                ${(product.count * product.price).toLocaleString('fa-ir')} تومان
                            </td>
                        </tr>
            `)
    })
})

printBtn.addEventListener("click", () => {
    window.print()
});