<script>
export default {
  name: 'tbQuit',
  created() {
    require('electron').remote.getCurrentWindow().close();
  },
};
</script>
