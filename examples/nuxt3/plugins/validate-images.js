export default defineNuxtPlugin(() => {
  const validator = (el) => {
    var url = el.getAttribute("data-src")
    if (url) {
      var image = new Image()

      image.onload = function () {
        // image exists and is loaded
        el.classList.remove("validateImage")
        el.src = url
      }
      image.onerror = function () {
        // image did not load so lets leave the placeholder
      }

      image.src = url
    }
  }
  const ready = (fn) => {
    if (document.readyState != "loading") {
      fn()
    } else {
      document.addEventListener("DOMContentLoaded", fn)
    }
  }

  return {
    provide: {
      validateImages: async () => {
        await nextTick()
        ready(() => {
          const images = document.querySelectorAll(".validateImage")
          images.forEach(validator)
        })
      },
    },
  }
})
