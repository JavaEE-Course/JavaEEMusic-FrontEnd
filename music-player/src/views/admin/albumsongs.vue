<template>
  <div class="table" style="margin-left: 160px">
    <div class="container">
      <div class="handle-box">
        <el-button class="handle-del mr10" type="primary" size="mini" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" class="handle-input mr10" size="mini" placeholder="筛选关键词"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加歌曲</el-button>
      </div>
      <el-table ref="multipleTable" size="mini" border style="width: 100%" height="520px"
                :data="data.filter(data => !select_word || data.singer_name.toLowerCase().includes(select_word.toLowerCase()))"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="专辑图片" width="110" align="center">
          <template slot-scope="scope">
            <div class="singer-img">
              <img :src= "tempDate.cover_path"  alt="" style="width: 100%;"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="song_name" label="歌曲名称" width="120" align="center"></el-table-column>
        <el-table-column label="专辑名称" width="120" align="center">{{tempDate.album_name}}</el-table-column>
        <el-table-column label="歌手" width="120" align="center">{{tempDate.singer_name}}</el-table-column>
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

    <el-dialog title="添加歌曲" :visible.sync="centerDialogVisible" width="400px" center>
      pic: '',
      lyrics_path: '',
      score: ''
      <el-form class="demo-ruleForm" :model="registerForm" status-icon ref="registerForm" label-width="80px">
        <el-form-item prop="name" label="歌曲名称" size="mini">
          <el-input v-model="registerForm.name" placeholder="歌曲名称"></el-input>
        </el-form-item>
        <el-form-item prop="singer" label="歌手" size="mini">
          <el-input v-model="registerForm.singer" placeholder="歌曲歌手"></el-input>
        </el-form-item>
        <el-form-item prop="score" label="歌曲评分" size="mini">
          <el-input v-model="registerForm.score" placeholder="歌曲评分"></el-input>
        </el-form-item>
        <el-form-item label="请输入歌曲封面" size="mini">
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
        <el-form-item label="歌曲图片" size="mini">
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
        <el-form-item label="歌曲名称" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="歌手" size="mini">
          <el-input v-model="form.singer"></el-input>
        </el-form-item>
        <el-form-item label="歌词" size="mini">
          <el-input type="textarea" v-model="form.lyrics_path"></el-input>
        </el-form-item>
        <el-form-item label="歌曲" size="mini">
          <el-input v-model="form.songpath"></el-input>
        </el-form-item>
        <el-form-item label="评分" size="mini">
          <el-input v-model="form.score"></el-input>
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
import { getalbumdetailAPI } from '@/api/getalbumdetail'
import { getSongDetailAPI } from '@/api/getsonglist'
export default {
  created () {
    // 获取专辑歌曲
    let query = this.$route.query
    var params = {
      album_id: query.info
    }
    getalbumdetailAPI(params).then(res => {
      console.log(res.data.data)
      this.tableData = res.data.data.song_list
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
        pic: '',
        name: '',
        singer: '',
        lyrics_path: '',
        score: ''
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
        songpath: '',
        lyrics_path: '',
        name: '',
        singer: '',
        pic: '',
        score: ''
      },
      pageSize: 5, // 页数
      currentPage: 1, // 当前页
      idx: -1,
      songinfo: {}
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
    // 添加歌曲
    addsinger () {
      let params = new FormData()
      params.append('name', this.registerForm.name)
      params.append('singer', this.registerForm.singer)
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
      var parm = {
        'song_id': row.song_id
      }
      getSongDetailAPI(parm).then(res => {
        console.log(res.data.data)
        this.songinfo = res.data.data
      })
      this.editVisible = true
      this.form = {
        id: this.songinfo.id,
        songpath: this.songinfo.song_path,
        lyrics_path: this.songinfo.lyrics_path,
        name: this.songinfo.song_name,
        singer: this.songinfo.singer_name,
        pic: this.songinfo.cover_path,
        score: this.songinfo.song_score
      }
      this.imageUrl1 = this.songinfo.song_path
      console.log(this.imageUrl1)
    },
    // 保存编辑
    saveEdit () {
      let params = new FormData()
      //   pic: '',
      params.append('id', this.form.id)
      params.append('name', this.form.name)
      params.append('singer', this.form.singer)
      params.append('lyrics_path', this.form.lyrics_path)
      params.append('songpath', this.form.songpath)
      params.append('score', this.form.score)
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
    albumEdit (row) {
      // let query = this.$route.query;
      // var params = {
      //   project_id: query.project_id,
      //   student_id: query.user_id,
      // }
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
