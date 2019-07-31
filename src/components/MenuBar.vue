<template>
    <div class="menu-bar">
        <ul>
            <li>File</li>
            <li>Edit</li>
        </ul>
  </div>
</template>

<script>
export default {
    name: 'MenuBar',
    props: {
        msg: String
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.menu-bar
    background: #DDDDDD
    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.50), inset 0 2px 1px 0 #FFFFFF
    height: 24px;

ul
    list-style: none
    margin: 0
    padding: 0

li
    display: inline-block
    font-size: 16px;
    padding: 5px;
</style>
