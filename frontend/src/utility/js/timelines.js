
const timelinePics = document.querySelectorAll('.timeline-picture-t')

timelinePics.forEach(timelinePic => {
  timelinePic.addEventListener('click', () => {
    const cover = document.createElement('div')
    document.body.append(cover)

    cover.classList.toggle('body-cover')
    document.body.classList.toggle('overflow')
  })
})
