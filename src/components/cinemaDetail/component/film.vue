<template>
  <section class="pr v-slide-content">
    <ul class="v-slide-box pa" ref='vSlide' :class="{'slide-action': true}">
      <li v-for="item in lists">
        <img style="height: 90px" :class="{'click-select': lists[0] === item}" :src="`https://gw.alicdn.com/${item.poster}`" :data-id="item.id" alt="">
  		</li>
    </ul>
  </section>
</template>
<script>
export default {
  name: 'film',
  data() {
    return {
      imgNumber: 0,
      imgGap: 15,
      slideOffset: 0,
      slideWidth: 0,
      slideBoxLength: 0,
      slideMaxLength: 0,
      changeLength: 0,
      moveLength: 0,
      startX: 0,
      moveX: 0,
      prevMoveX: 0,
      moveSpeed: 0,
      speedMultiple: 20,
      leftBoundary: false,
      rightBoundary: false,
      slideAction: false,
      clickAction: false,
      flagTimer: false
    }
  },
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    computeSlideWidth(slideBox) {
      let imgEles = slideBox.querySelectorAll('img')
      let content = this
      let loadNumber = 0
      this.imgNumber = imgEles.length
      Array.prototype.forEach.call(imgEles, (item) => {
        item.onload = function() {
          this.setAttribute('data-width', this.clientWidth)
          content.slideWidth += this.clientWidth
          loadNumber++
          if (loadNumber === content.imgNumber) {
            let winWindth = document.documentElement.clientWidth || document.body.clientWidth
            let slideBoxLength = content.slideWidth + ((content.imgNumber - 1) * content.imgGap)
            content.slideMaxLength = slideBoxLength - winWindth - 8
            slideBox.style.width = slideBoxLength + 'px'
          }
        }
      })
    },
    reComputeSlideWidth(slideBox) {
      let imgEles = slideBox.querySelectorAll('img')
      let winWindth = 0
      let slideBoxLength = 0
      this.slideWidth = 0
      Array.prototype.forEach.call(imgEles, (item) => {
        this.slideWidth += item.clientWidth
        item.setAttribute('data-width', item.clientWidth)
      })
      winWindth = document.documentElement.clientWidth || document.body.clientWidth
      slideBoxLength = this.slideWidth + ((this.imgNumber - 1) * this.imgGap)
      this.slideMaxLength = slideBoxLength - winWindth - 8
      slideBox.style.width = slideBoxLength + 'px'
    },
    setTranslate(slideBox, length) {
      slideBox.style.transform = `translateX(${length}px)`
    },
    selectFilm(event, slideBox) {
      let ele = event.target
      this.slideAction = true
      this.clickAction = true
      clearTimeout(this.flagTimer)
      if (ele.tagName === 'IMG') {
        let winWindth = document.documentElement.clientWidth || document.body.clientWidth
        let selfWidth = +ele.getAttribute('data-width')
        let id = ele.getAttribute('data-id')
        let imgEles = slideBox.querySelectorAll('img')
        this.$parent.itemId = id
        for (let i = 0; i < imgEles.length; i++) {
          if (imgEles[i].className === 'click-select') {
            imgEles[i].className = ''
            break
          }
        }
        ele.className = 'click-select'
        this.reComputeSlideWidth(slideBox)
        this.slideOffset = (winWindth - selfWidth) / 2 - ele.offsetLeft
        if (this.slideOffset > 0) {
          this.slideOffset = 0
        } else if (this.slideOffset < -this.slideMaxLength) {
          this.slideOffset = -this.slideMaxLength
        }
        this.setTranslate(slideBox, this.slideOffset)
        this.flagTimer = setTimeout(() => {
          this.clickAction = false
        }, 1000)
      }
    },
    slideStart(event) {
      this.slideAction = false
      this.startX = event.touches[0].clientX
    },
    slideMove(event, slideBox) {
      this.leftBoundary = false
      this.rightBoundary = false
      this.moveX = event.touches[0].clientX
      this.changeLength = this.moveX - this.startX
      this.moveLength = this.slideOffset + this.changeLength
      if (this.moveLength > 0 && this.changeLength > 0) {
        this.leftBoundary = true
        this.setTranslate(slideBox, 0)
        return
      }
      if (this.moveLength < -this.slideMaxLength && this.changeLength < 0) {
        this.rightBoundary = true
        this.setTranslate(slideBox, -this.slideMaxLength)
        return
      }
      this.setTranslate(slideBox, this.moveLength)
      this.moveSpeed = this.moveX - this.prevMoveX
      this.prevMoveX = this.moveX
    },
    slideEnd(event, slideBox) {
      if (this.leftBoundary) {
        this.slideOffset = 0
      } else if (this.rightBoundary) {
        this.slideOffset = -this.slideMaxLength
      } else {
        this.slideAction = true
        if (Math.abs(this.moveSpeed) < 2) {
          this.moveSpeed = 0
        }
        this.slideOffset = this.moveLength + this.moveSpeed * this.speedMultiple
        if (this.slideOffset > 0) {
          this.slideOffset = 0
        } else if (this.slideOffset < -this.slideMaxLength) {
          this.slideOffset = -this.slideMaxLength
        }
        this.setTranslate(slideBox, this.slideOffset)
      }
    },
    addListenEvent(slideBox) {
      slideBox.addEventListener('click', (event) => {
        this.selectFilm.call(this, event, slideBox)
      }, false)
      slideBox.addEventListener('touchstart', (event) => {
        if (this.clickAction === false) {
          this.slideStart.call(this, event)
        }
      }, false)
      slideBox.addEventListener('touchmove', (event) => {
        if (this.clickAction === false) {
          this.slideMove.call(this, event, slideBox)
        }
      }, false)
      slideBox.addEventListener('touchend', (event) => {
        if (this.clickAction === false) {
          this.slideEnd.call(this, event, slideBox)
        }
      }, false)
    },
    init() {
      let slideBox = this.$refs.vSlide
      this.computeSlideWidth(slideBox)
      this.addListenEvent(slideBox)
    }
  },
  watch: {
    lists() {
      this.$nextTick(() => {
        this.init()
      })
    }
  }
}

</script>
<style>
.v-slide-content {
  width: 100%;
  height: 120px;
  overflow: hidden;
}

.v-slide-box {
  height: 90px;
  bottom: 0;
  box-sizing: border-box;
}

.v-slide-box li:first-child {
  margin-left: 15px;
}

.v-slide-box li {
  float: left;
  margin-right: 10px;
  height: 100%;
}

.v-slide-box img {
  width: auto;
  height: 100%;
  transition: all .3s ease-out;
  -webkit-transition: all .3s ease-out;
}

.slide-action {
  transition: transform .7s ease-out;
  -webkit-transition: transform .7s ease-out;
}

.click-select {
  height: 100px !important;
  margin-top: -10px;
  border: 2px solid #fff;

}

</style>
