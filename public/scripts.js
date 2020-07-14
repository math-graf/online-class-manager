const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

function paginate(currentPage, totalPages) {
    let allPages = [],
        oldPage

    for (let page = 1; page <= totalPages; page++) {

        const firstAndLastPages = page == 1 || page == totalPages
        const pagesAroundCurrentPage = page >= (currentPage - 2) && page <= (currentPage + 2)

        if (firstAndLastPages || pagesAroundCurrentPage) {
            if (oldPage && page - oldPage > 2) {
                allPages.push('...')
            } else if (oldPage && page - oldPage == 2) {
                allPages.push(page - 1)
            }
            allPages.push(page)
            oldPage = page
        }
    }
    return allPages
}

function createPagination(pagination) {
    const selectedPage = +pagination.dataset.page
    const totalPages = +pagination.dataset.total
    const filter = pagination.dataset.filter
    const pages = paginate(selectedPage, totalPages)

    let elements = ''

    for (let page of pages) {
        if (String(page).includes('...')) {
            elements += `<span>${page}</span>`
        } else if (filter) {
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
        } else {
            elements += `<a href="?page=${page}">${page}</a>`
        }
    }
    pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')

if (pagination) {
    createPagination(pagination)
}
