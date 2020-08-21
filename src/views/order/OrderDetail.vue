<template>
  <div class="order_detail">
    <van-nav-bar title="订单详情" left-text="返回" @click-left="$router.push('/orderinquiry')" left-arrow></van-nav-bar>
    <div class="content1">
      <ul class="detail1">
        <li>
          <p>订单号：</p>
          <span>{{datas.cordno}}</span>
        </li>
        <li>
          <p>业务类型：</p>
          <span>{{datas.codeName1}}</span>
        </li>
        <li>
          <p>业务模式：</p>
          <span>{{datas.cbusimode}}</span>
        </li>
        <li>
          <p>委托客户：</p>
          <span>{{datas.ccontactname}}</span>
        </li>
        <li>
          <p>订单日期：</p>
          <span>{{datas.dorderdate}}</span>
        </li>
        <li>
          <p>订单汇率：</p>
          <span>{{datas.norderrate}}</span>
        </li>
        <li>
          <p>海关汇率：</p>
          <span>{{datas.ncustomscrate}}</span>
        </li>
        <li>
          <p>订单币别：</p>
          <span>{{datas.cordercurrency}}</span>
        </li>
        <li>
          <p>订单金额：</p>
          <span>{{datas.ccustomsamount}}</span>
        </li>
        <li>
          <p>代理费：</p>
          <span>{{datas.nagencyamt}}</span>
        </li>
        <li>
          <p>订单状态：</p>
          <span>{{datas.codeName2}}</span>
        </li>
        <li>
          <p>收货状态：</p>
          <span>{{datas.codeName3}}</span>
        </li>
        <li>
          <p>报关状态：</p>
          <span>{{datas.codeName4}}</span>
        </li>
        <li>
          <p>派货状态：</p>
          <span>{{datas.codeName5}}</span>
        </li>
        <li>
          <p>VMI出库状态：</p>
          <span>{{datas.codeName6}}</span>
        </li>
        <li>
          <p>送货回签状态：</p>
          <span>{{datas.codeName7}}</span>
        </li>
        <li>
          <p>应付结算状态：</p>
          <span>{{datas.codeName8}}</span>
        </li>
        <li>
          <p>应收结算状态：</p>
          <span>{{datas.codeName9}}</span>
        </li>
        <li>
          <p>开票状态：</p>
          <span>{{datas.codeName11}}</span>
        </li>
        <li>
          <p>收票状态：</p>
          <span>{{datas.codeName10}}</span>
        </li>
      </ul>
    </div>
    <div class="list">
      <span>附件列表：</span>
      <p v-for="(list,i) in lists" :key="'span' + i">
        <a :href="'https://gy.szcasic.com/hterptest/' + list.fileUrl">{{list.fileName}}</a>
      </p>
    </div>
    <div class="content">
      <van-collapse
        v-model="activeNames"
        v-for="(item,index) in orderdetail"
        :key="index"
        @change="onChange(index)"
        class="van"
        :class="{ul:keyIndex=== index && show}"
      >
        <van-collapse-item :name="index">
          <div slot="title">
            <div v-if="index % 2 == 0" class="nameli">
              <p>{{item.cspec}}</p>
              <span>{{item.cpartname}}</span>
              <span style="padding-left: 10%;">{{item.coriginal}}</span>
              <span style="padding-left: 10%;">{{item.cbrand}}</span>
            </div>
            <div v-if="index % 2 !== 0" class="name">
              <p>{{item.cspec}}</p>
              <span>{{item.cpartname}}</span>
              <span style="padding-left: 10%;">{{item.coriginal}}</span>
              <span style="padding-left: 10%;">{{item.cbrand}}</span>
            </div>
          </div>
          <ul class="detail">
            <li>
              <p>客户料号：</p>
              <span>{{item.ccustpartno}}</span>
            </li>
            <li v-if="item.cpricelevelstatus == 2">
              <p>审价状态：</p>
              <span>完成</span>
            </li>
            <li v-if="item.cpricelevelstatus == 1">
              <p>审价状态：</p>
              <span>未完成</span>
            </li>
            <li>
              <p>监管条件：</p>
              <span>{{item.csupervisetype}}</span>
            </li>
            <li>
              <p>成交单位：</p>
              <span>{{item.cunit}}</span>
            </li>
            <li>
              <p>报关数量：</p>
              <span>{{item.ndeclareqty}}</span>
            </li>
            <li>
              <p>交货数量：</p>
              <span>{{item.ndeliveryqty}}</span>
            </li>
            <li>
              <p>订单金额：</p>
              <span>{{item.nordamount}}</span>
            </li>
            <li>
              <p>订单数量：</p>
              <span>{{item.nordqty}}</span>
            </li>
            <li>
              <p>价格级别：</p>
              <span>{{item.nprcielevel}}</span>
            </li>
            <li>
              <p>单价（报关价）：</p>
              <span>{{item.nprice}}</span>
            </li>
            <li>
              <p>实收数量：</p>
              <span>{{item.nrecqty}}</span>
            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div id="footer">
      <van-button type="primary" @click="check()">审核</van-button>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
// Dialog({ message: '提示' });

export default {
  name: "OrderDetail",
  data() {
    return {
      activeNames: [],
      oid: "",
      datas: [],
      orderdetail: [],
      show: false,
      keyIndex: "",
      lists: []
    };
  },
  mounted() {
    this.getData();
    this.getList();
  },
  methods: {
    onChange(index) {
      this.show = !this.show;
      this.keyIndex = index;
    },
    getData() {
      this.oid = localStorage.getItem("id");
      this.$axios
        .get(this.url + "/api/Payment/Orderlistdetial", {
          params: { ZR_ORD_MASTEROID: this.oid }
        })
        .then(res => {
          this.datas = res.data;
          this.orderdetail = res.data.zrOrdOrderd1s;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      this.oid = localStorage.getItem("id");
      this.$axios
        .post(this.url + "/api/Payment/GetDocdatas?input=" + this.oid)
        .then(res => {
          this.lists = res.data.items;
        });
    },
    check() {
      this.oid = localStorage.getItem("id");
      this.$axios
        .get(this.url + "/api/Payment/CheckOrder", {
          params: { input: this.oid }
        })
        .then(res => {
          Dialog.alert({
            title: "提示",
            message: res.data
          }).then(() => {
            this.$router.push("/orderinquiry");
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.content1 {
  padding: 49px 20px 20px 20px;
}

.detail1 {
  border: 1px solid #cccacb;
}

.content1 .detail1 li {
  font-size: 0.8rem;
  border-bottom: 1px solid #cccacb;
  padding: 5px 0;
}

.content1 .detail1 li p {
  display: inline-block;
  width: 30%;
  text-align: right;
  padding: 1% 5% 1% 8%;
  margin: 0;
}

.content .name {
  overflow: hidden;
  padding: 0 10%;
}

.content .nameli {
  background: #f3eded !important;
  height: 100%;
  padding: 0 10%;
}

.content .van .name,
.content .van .nameli {
  p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 2vw 0;
    font-size: 4vw;
  }

  span {
    font-size: 1.5vw;
  }
}

.content .ul .name,
.content .ul .nameli {
  p {
    width: 100%;
    white-space: pre-wrap !important;
    margin: 2vw 0;
    font-size: 4vw;
  }

  span {
    font-size: 1.5vw;
  }
}

.content .detail {
  background: #ebebeb;
}

.content .detail li {
  font-size: 0.8rem;
  border-bottom: 1px solid #cccacb;
  padding: 5px 0;

  p {
    display: inline-block;
    width: 30%;
    padding-left: 8%;
    margin: 0;
  }

  p:first-child {
    text-align: left;
  }
}

#footer {
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.list {
  padding: 2vw 0;
  background: rgb(204, 232, 207);
  margin-bottom: 2vw;
}

.list p {
  margin: 0;
  margin-left: 28%;
  font-size: 3vw;
}
.list span {
  font-size: 0.8rem;
  padding: 10px 0;
  margin-right: 2%;
  margin-left: 8%;
}
</style>
<style lang="scss">
.order_detail {
  margin-bottom: 10vw;

  .van-nav-bar {
    position: fixed;
    width: 100%;
    background: #f7f7f7;
  }

  #footer .van-button {
    height: 30px;
    line-height: 30px;
  }

  #footer .van-button--normal {
    padding: 0;
    width: 100%;
  }

  .van-cell {
    padding: 0;
  }

  .van-cell__right-icon {
    display: none;
  }

  .van-cell__title {
    width: 100%;
  }

  .van-cell__title > div {
    height: 100%;
  }
}
</style>