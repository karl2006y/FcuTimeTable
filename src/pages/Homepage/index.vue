<script>
export default {
  name: "homepage",
  data() {
    return {
      loading: false,
      login: false,
      username: "",
      password: "",
      classSorted: [],
      lngType: "中文",
      startDay: "",
      endDay: "",
      classWeek: {},
      min: 5,
      first: false
    };
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
