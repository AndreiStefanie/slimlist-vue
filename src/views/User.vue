<template>
  <User/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import User from '@/components/User';

export default {
  name: 'User',
  components: {
    User
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      user: 'user/user'
    })
  },
  methods: {
    logout() {
      this.signOut();
      this.$router.push('/');
    },
    ...mapActions({
      signOut: 'user/signOut'
    })
  }
};
</script>
