<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
    Hello World
    <p>{{ info }}</p>
    <p>{{ userAge }}</p>
  </d2-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Page1',
  computed: {
    ...mapState('demo/data', [
      'info'
    ]),
    ...mapGetters('demo/data', [
      'userAge'
    ])
  }
}
</script>
