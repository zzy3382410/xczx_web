<template>
  <div>
    <el-form :model="params" :inline="true">
      <el-row>
        <el-form-item label="页面别名：">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option v-for="item in siteList"
                   :key="item.siteId"
                   :label="item.siteName"
                   :value="item.siteId">
        </el-option>
      </el-select>
        </el-form-item>

      <el-form-item label="页面别名：">
        <el-input v-model="params.pageAliase" style="width: 100px"></el-input>
      </el-form-item>

      <el-form-item label="页面名称：">
        <el-input v-model="params.pageName" style="width: 100px"></el-input>
      </el-form-item>

      <el-form-item label="页面类型：" >
        <!--<el-input v-model="params.pageType" style="width: 100px"></el-input>-->
        <el-select v-model="params.pageType" placeholder="请选择页面类型" >
          <el-option value="1" label="动态"></el-option>
          <el-option value="0" label="静态"></el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary" v-on:click="query" >查询</el-button>

      <router-link class="mui-tab-item" to="{path:'/cms/page/add/'}">
        <router-link :to="{path:'/cms/page/add',query:{
        page:this.params.page,
        siteId:this.params.siteId
      }}">
          <el-button  type="primary" >新增页面</el-button>
        </router-link>
      </router-link>
      </el-row>
    </el-form>
    <!--编写页面静态部分，即view部分-->

    <el-table
      :data="list"
      stripe
      border
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" >
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="page">
          <el-button
          size="small"
          type="text"
          @click="edit(page.row.pageId)">
            编辑
          </el-button>
          <el-button
          size="small"
          type="text"
          @click="del(page.row.pageId)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
   <!-- <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      v-on:current-change="changePage"
      style="float:right">
    </el-pagination>-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="changePage"
      :current-page="params.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="params.size"
      layout="total, sizes, prev, pager, next"
      :total="total"
      style="float:right">
    </el-pagination>
  </div>
</template>

<script>
  import *as cmsApi from '../api/cms'
  export default {
    data() {
      return {
        siteList: [],
        list: [],
        total: 10,
        params: {
          siteId: '',
          pageAliase: '',
          page: 1,
          size: 10
        }
      }
    },
    methods: {
      //分页查询
      changePage: function (page) {
        this.params.page = page;
        this.query()
      },
      handleSizeChange:function(size){
        this.params.size = size;
        this.query()
      },
      //查询
      query: function () {
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
          console.log(res);
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      edit: function (pageId) {
        //打开修改页面
        this.$router.push({
          path: '/cms/page/edit/' + pageId
        })
      },
      del:function (pageId) {
        this.$confirm('确认删除此页面吗？','提示',{}).then(()=>{
          cmsApi.page_del(pageId).then((res)=>{
            if (res.success){
              this.$message({
                type:'success',
                message:'删除成功！'
              });
              this.query();
            } else {
              this.$message({
                type:'error',
                message:'删除失败！'
              })
            }
          })
        })
      }
    },
    created(){
      this.params.page=Number.parseInt(this.$route.query.page||1);
      this.params.siteId = this.$route.query.siteId||'';

     },
    mounted(){
      //当DOM元素渲染完成后调用query
      this.query()
      //初始化站点列表
      this.siteList = [
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          siteName:'门户主站'
        },
        {
          siteId:'102',
          siteName:'测试站'
        }
      ]
    }
  }
</script>
<style>

</style>
