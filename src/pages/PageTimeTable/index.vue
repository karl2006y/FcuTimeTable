<script>
import check from "@/components/lottie/check.json";

export default {
  name: "pageTimeTable",

  props: {
    classTable: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      checkOptions: { animationData: check },
      checkClassPic: false,
      classWeek: [[], [], [], [], [], [], [], []],
      classView: [
        [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
      ],
      loading: false,
      allClassNum: 0,
      edit: {
        x: 0,
        y: 0,
        classData: {}
      },
      timeRange: [
        ,
        "08:10~09:00",
        "09:10~10:00",
        "10:10~11:00",
        "11:10~12:00",
        "12:10~13:00",
        "13:10~14:00",
        "14:10~15:00",
        "15:10~16:00",
        "16:10~17:00",
        "17:10~18:00",
        "18:10~19:00",
        "19:10~20:00",
        "20:10~21:00",
        "21:10~22:00"
      ],
      weeken: false,

      daysOneWeek: 5
    };
  },

  methods: {
    viewC() {
      var classTable = this.classTable;
      for (var i = 0; i < classTable.length; i++) {
        var curr = classTable[i];
        this.classView[curr.SctWeek][curr.SctPeriod].push(curr);
      }
      for (var x = 0; x < this.classView.length; x++) {
        for (var y = 0; y < this.classView[x].length; y++) {
          if (!this.classView[x][y][0]) {
            this.creatNewClassHandler(x, y);
          }
        }
      }
      this.classWeek = [[], [], [], [], [], [], [], []];
    },
    viewToEditHandler(x, y) {
      var edit = this.edit;
      var classView = this.classView;
      edit.classData = {};
      edit.x = x;
      edit.y = y;
      edit.classData = classView[x][y][0];
    },
    creatNewClassHandler(x, y) {
      var edit = this.edit;
      var classView = this.classView;
      edit.classData = {};
      edit.x = x;
      edit.y = y;
      edit.classData = {
        ClsId: "",
        ClsName: " ",
        PeriodTime: this.timeRange[y],
        RomId: "",
        RomName: undefined,
        ScoWarning: null,
        ScrDup: "",
        ScrSelcode: "",
        SctPeriod: y,
        SctWeek: x,
        SubId: x.toString() + y.toString(),
        SubName: undefined,
        TchLink: " ",
        YmsSmester: 2,
        YmsYear: 107,
        TeacherName: undefined
      };
      classView[x][y][0] = edit.classData;
    },
    hideModal() {
      setTimeout(() => {
        $(".modal").modal("hide");
        this.checkClassPic = false;
      }, 1000);
    },
    editSaveHandler(x, y) {
      var edit = this.edit;
      var classView = this.classView;
      classView[x][y][0] = edit.classData;
      edit.classData = {};
    },
    classSort_class() {
      var classTable = this.classTable;
      for (var i = 0; i < classTable.length; i++) {
        var index = classTable[i].SctWeek;
        this.classWeek[index].push(classTable[i]);
      }
    },
    classSort_final() {
      this.classWeek = [[], [], [], [], [], [], [], []];
      for (var x = 0; x < this.classView.length; x++) {
        for (var y = 0; y < this.classView[x].length; y++) {
          if (this.classView[x][y][0].SubName != undefined) {
            this.classWeek[x].push(this.classView[x][y][0]);
          }
        }
      }
      if (!this.weeken) {
        this.classWeek[6] = [];
        this.classWeek[7] = [];
      }
      this.$emit("get-classWeek", this.classWeek);
      this.$router.push({
        name: "chooseday"
      });
    }
  },
  created() {
    this.classSort_class();
    this.viewC();
  },
  updated() {
    if (this.weeken) {
      this.daysOneWeek = 7;
    } else {
      this.daysOneWeek = 5;
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
