<template>
<div class="vue-uploader">
  <div class="file-list">
    <section v-for="(file, index) of files" :key="index" class="file-item draggable-item">
      <img :src="file.src" alt="">
      <span class="file-remove" @click="remove(index)">+</span>
    </section>
    <section v-if="status === 'ready' && !(once && files.length >= 1)" class="file-item">
      <div @click="add" class="add">
        <span>+</span>
      </div>
    </section>
  </div>

  <section v-if="files.length !== 0" class="upload-func">
    <div class="progress-bar">
      <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
    </div>
    <div class="operation-box">
      <mt-button v-if="status === 'ready'" type="primary" size="small" @click.native="submit">{{submitText}}</mt-button>
      <!--<mt-button v-if="status === 'finished'" type="primary" size="small" @click.native="finished">完成</mt-button>-->
    </div>
  </section>
  <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
</div>
</template>

<script>
import { accountTestMixin } from '@/common/js/mixin'
import axios from 'axios'
export default {
  mixins: [ accountTestMixin ],
  props: {
    src: {
      type: String,
      required: true
    },
    once: {
      type: Boolean,
      default: false
    },
    submitText: {
      type: String,
      default: '上传'
    }
  },
  data () {
    return {
      status: 'ready',
      files: [],
      point: {},
      uploading: false,
      percent: 0
    }
  },
  methods: {
    add () {
      this.$refs.file.click()
    },
    submit () {
      if (this.files.length === 0) {
        console.warn('no file!')
        return
      }
      const formData = new FormData()
      this.files.forEach((item) => {
        formData.append(item.name, item.file)
      })
      axios.post(this.src, formData, {
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        if (res.data.code === 200 && res.data.data.length) {
          this.$emit('success', res.data.data)
          // this.status = 'finished'
          this.finished()
        } else {
          this.status = 'error'
        }
      })
    },
    finished () {
      this.files = []
      this.status = 'ready'
    },
    remove (index) {
      this.files.splice(index, 1)
      if (!this.files.length) {
        this.$emit('empty')
      }
    },
    fileChanged () {
      const list = this.$refs.file.files
      if (list.length) {
        this.$emit('addImage')
      }
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            name: list[i].name,
            size: list[i].size,
            file: list[i]
          }
          this.html5Reader(list[i], item)
          this.files.push(item)
        }
      }
      this.$refs.file.value = ''
    },
    // 将图片文件转成BASE64格式
    html5Reader (file, item) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.$set(item, 'src', e.target.result)
      }
      reader.readAsDataURL(file)
    },
    isContain (file) {
      this.files.forEach((item) => {
        if (item.name === file.name && item.size === file.size) {
          return true
        }
      })
      return false
    },
    uploadProgress (evt) {
      const component = this
      if (evt.lengthComputable) {
        const percentComplete = Math.round((evt.loaded * 100) / evt.total)
        component.percent = percentComplete / 100
      } else {
        console.warn('upload progress unable to compute')
      }
    }
  }
}
</script>

<style>
.vue-uploader {
  border: 1px solid #e5e5e5;
}

.vue-uploader .file-list {
  padding: 10px 0;
}

.vue-uploader .file-list:after {
  content: '';
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}

.vue-uploader .file-list .file-item {
  float: left;
  position: relative;
  width: 100px;
  text-align: center;
}

.vue-uploader .file-list .file-item img {
  width: 80px;
  height: 80px;
  border: 1px solid #ececec;
}

.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 12px;
  display: none;
  top: 4px;
  width: 14px;
  height: 14px;
  color: white;
  cursor: pointer;
  line-height: 12px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}

.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}

.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.vue-uploader .add {
  width: 80px;
  height: 80px;
  margin-left: 10px;
  float: left;
  text-align: center;
  line-height: 80px;
  border: 1px dashed #ececec;
  font-size: 30px;
  cursor: pointer;
}

.vue-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0;
  background: #f8f8f8;
  border-top: 1px solid #ececec;
}

.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}

.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all .5s ease;
}

/* .vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
} */

/* .vue-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007ACC;
  border: none;
  border-radius: 2px;
  cursor: pointer;
} */

.vue-uploader>input[type="file"] {
  display: none;
}
</style>
