<template>
  <div class="table" style="margin-left: 160px">
    <div class="container">
      <div class="handle-box">
        <el-button class="handle-del mr10" type="primary" size="mini" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" class="handle-input mr10" size="mini" placeholder="筛选关键词"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加专辑</el-button>
      </div>
      <el-table ref="multipleTable" size="mini" border style="width: 100%" height="520px"
                :data="data.filter(data => !select_word || data.singer_name.toLowerCase().includes(select_word.toLowerCase()))"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="专辑图片" width="110" align="center">
          <template slot-scope="scope">
            <div class="singer-img">
              <img :src= "scope.row.cover_path"  alt="" style="width: 100%;"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="album_name" label="专辑名称" width="120" align="center"></el-table-column>
        <el-table-column prop="singer_name" label="歌手" width="120" align="center"></el-table-column>
        <el-table-column label="简介" prop="introduction" style="height: 100px">
          <template slot-scope="scope">
            <p style="height: 100px; overflow: scroll;">{{ scope.row.introduction }}</p>
          </template>
        </el-table-column>
        <el-table-column label="专辑管理" width="110" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="albumEdit(scope.row)">专辑管理</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.album_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="tableData.length"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="添加专辑" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form class="demo-ruleForm" :model="registerForm" status-icon ref="registerForm" label-width="80px">
        <el-form-item prop="name" label="专辑名称" size="mini">
          <el-input v-model="registerForm.name" placeholder="专辑名称"></el-input>
        </el-form-item>
        <el-form-item prop="singer" label="专辑歌手" size="mini">
          <el-input v-model="registerForm.singer" placeholder="专辑歌手"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="专辑介绍" size="mini">
          <el-input v-model="registerForm.introduction" type="textarea" placeholder="专辑介绍"></el-input>
        </el-form-item>
        <el-form-item label="请输入专辑封面" size="mini">
          <el-upload ref="upfile"
                     style="display: inline"
                     :auto-upload="false"
                     :on-change="handleChange"
                     :file-list="fileList"
                     action="#">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="addsinger">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="400px">
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="专辑名称" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="歌手" size="mini">
          <el-input v-model="form.singer"></el-input>
        </el-form-item>
        <el-form-item label="简介" size="mini">
          <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item label="头像" size="mini">
          <el-upload ref="upfile"
                     style="display: inline"
                     :auto-upload="false"
                     :on-change="handleChange1"
                     :file-list="fileList1"
                     action="#">
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini"  @click="editVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt" align="center">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="delVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getallalbumAPI } from '@/api/getallalbum'
// eslint-disable-next-line standard/object-curly-even-spacing
import { albumaddAPI, albumeditAPI, albumdeleteAPI} from '@/api/albummangement'
export default {
  created () {
    // 获取歌手
    getallalbumAPI().then(res => {
      console.log(res.data.data)
      this.tableData = res.data.data
      this.tempDate = res.data.data
      this.currentPage = 1
    })
  },
  computed: {
    data () {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  data () {
    return {
      imageUrl: '',
      fileList: [],
      imageUrl1: '',
      fileList1: [],
      registerForm: {
        // 添加框信息
        name: '',
        singer: '',
        introduction: ''
      },
      tableData: [],
      tempDate: [],
      multipleSelection: [],
      centerDialogVisible: false,
      editVisible: false,
      delVisible: false,
      select_word: '',
      form: {
        id: '',
        name: '',
        singer: '',
        pic: '',
        introduction: ''
      },
      pageSize: 5, // 页数
      currentPage: 1, // 当前页
      idx: -1
    }
  },
  methods: {
    handleChange (file, fileList) {
      this.fileList = fileList
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(fileList)
    },
    handleChange1 (file, fileList) {
      this.fileList1 = fileList
      this.imageUrl1 = URL.createObjectURL(file.raw)
    },
    // 获取当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 添加专辑
    addsinger () {
      let params = new FormData()
      params.append('name', this.registerForm.name)
      params.append('singer', this.registerForm.singer)
      params.append('description', this.registerForm.introduction)
      this.fileList.forEach(item => {
        params.append('cover', item.raw)
      })
      albumaddAPI(params).then(res => {
        if (res.data.code !== 200) {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
        console.log(res.data)
      })
      this.centerDialogVisible = false
    },
    // 编辑
    handleEdit (row) {
      this.editVisible = true
      this.form = {
        id: row.album_id,
        name: row.album_name,
        singer: row.singer_name,
        introduction: row.introduction
      }
    },
    // 保存编辑
    saveEdit () {
      let params = new FormData()
      params.append('id', this.form.id)
      params.append('name', this.form.name)
      params.append('singer', this.form.singer)
      params.append('description', this.form.introduction)
      this.fileList1.forEach(item => {
        params.append('cover', item.raw)
      })
      albumeditAPI(params).then(res => {
        console.log(res.data)
      })
      this.editVisible = false
    },
    // 删除
    handleDelete (id) {
      this.delVisible = true
      this.idx = id
    },
    // 确定删除
    deleteRow () {
      let params = {
        'id': this.idx
      }
      albumdeleteAPI(params).then(res => {
        console.log(res.data)
      })
      this.delVisible = false
    },
    // 专辑管理
    albumEdit (row) {
      var params = {
        info: row
      }
      this.$router.push({path: '/admin/albumsongs', query: {info: params.info.album_id}})
    },
    // 获取批量要删除的列表
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 批量删除
    delAll () {
      for (let item of this.multipleSelection) {
        this.handleDelete(item.id)
        this.deleteRow(item.id)
      }
      this.multipleSelection = []
    }
  }
}
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
    margin-left: -510px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }

  .singer-img {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 5px;
    overflow: hidden;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
