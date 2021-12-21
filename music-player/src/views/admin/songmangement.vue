<template>
  <div class="table" style="margin-left: 160px">
    <div class="container">
      <div class="handle-box">
        <el-button class="handle-del mr10" type="primary" size="mini" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" class="handle-input mr10" size="mini" placeholder="筛选关键词"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加歌单</el-button>
      </div>
      <el-table ref="multipleTable" size="mini" border style="width: 100%" height="520px"
                :data="data.filter(data => !select_word || data.name.toLowerCase().includes(select_word.toLowerCase()))"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="歌单图片" width="110" align="center">
          <template slot-scope="scope">
            <div class="singer-img">
              <img :src= "scope.row.playlist_picture"  alt="" style="width: 100%;"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="playlist_name" label="歌单名称" width="120" align="center"></el-table-column>
        <el-table-column label="简介" prop="playlist_introduction" style="height: 100px">
          <template slot-scope="scope">
            <p style="height: 100px; overflow: scroll;">{{ scope.row.playlist_introduction }}</p>
          </template>
        </el-table-column>
        <el-table-column label="歌单管理" width="110" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="albumEdit(scope.row.playlist_id)">歌单管理</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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

    <el-dialog title="添加歌手" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form class="demo-ruleForm" :model="registerForm" status-icon ref="registerForm" label-width="80px">
        <el-form-item prop="name" label="歌手名" size="mini">
          <el-input v-model="registerForm.name" placeholder="歌手名"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="registerForm.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">组合</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="introduction" label="歌手介绍" size="mini">
          <el-input v-model="registerForm.introduction" type="textarea" placeholder="歌手介绍"></el-input>
        </el-form-item>
        <el-form-item label="请输入新头像" size="mini">
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
        <el-form-item label="歌手" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="form.sex">
            <el-radio :label="0" value="女">女</el-radio>
            <el-radio :label="1" value="男">男</el-radio>
            <el-radio :label="2">组合</el-radio>
          </el-radio-group>
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
    <!--    专辑-->
    <el-dialog title="专辑信息" :visible.sync="albumVisible" width="600px">
      <el-table size="mini" border style="width: 100%" :data="albumList">
        <el-table-column label="专辑图片" width="110" align="center">
          <template slot-scope="scope">
            <div class="singer-img">
              <img :src= "scope.row.coverPath"  alt="" style="width: 100%;"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="专辑名称" width="120" align="center"></el-table-column>
        <el-table-column label="简介" prop="introduction" style="height: 100px">
          <template slot-scope="scope">
            <p style="height: 100px; overflow: scroll;">{{ scope.row.introduction }}</p>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini"  @click="albumVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="albumVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line standard/object-curly-even-spacing
import { getallplaylistAPI} from '@/api/getallplaylist'
export default {
  created () {
    // 获取歌单
    getallplaylistAPI().then(res => {
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
        sex: '',
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
        sex: '',
        pic: '',
        introduction: ''
      },
      pageSize: 5, // 页数
      currentPage: 1, // 当前页
      idx: -1,
      albumList: [],
      albumVisible: false
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
    // 添加歌手
    addsinger () {
      var sex = ''
      if (this.registerForm.sex === 0) {
        sex = '女'
      }
      if (this.registerForm.sex === 1) {
        sex = '男'
      }
      if (this.registerForm.sex === 2) {
        sex = '组合'
      }
      console.log(sex)
      let params = new FormData()
      params.append('name', this.registerForm.name)
      params.append('sex', sex)
      params.append('description', this.registerForm.introduction)
      this.fileList.forEach(item => {
        params.append('avatar', item.raw)
      })
      // edituserinfoAPI(params).then(res => {
      //   console.log(res.data)
      // })
      this.centerDialogVisible = false
    },
    // 编辑
    handleEdit (row) {
      this.editVisible = true
      console.log(row.type)
      var sex = -1
      if (row.type === '女') {
        sex = 0
      }
      if (row.type === '男') {
        sex = 1
      }
      if (row.type === '组合') {
        sex = 2
      }
      this.form = {
        id: row.id,
        name: row.name,
        sex: sex,
        introduction: row.introduction
      }
    },
    // 保存编辑
    saveEdit () {
      let params = new FormData()
      params.append('id', this.form.id)
      params.append('name', this.form.name)
      params.append('sex', this.form.sex)
      params.append('introduction', this.form.introduction)
      this.fileList1.forEach(item => {
        params.append('avatar', item.raw)
      })
      // edituserinfoAPI(params).then(res => {
      //   console.log(res.data)
      // })
      this.editVisible = false
    },
    // 删除
    handleDelete (id) {
      this.delVisible = true
      this.idx = id
    },
    // 确定删除
    deleteRow () {
      this.delVisible = false
    },
    // 专辑管理
    albumEdit (id) {
      var params = {
        info: id
      }
      this.$router.push({path: '/admin/playlistsongs', query: {info: params.info}})
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
