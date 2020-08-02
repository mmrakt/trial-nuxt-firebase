<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Navigation lists</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense>
          <!-- no-actionで下の階層の項目を中央揃えに
          :append-iconでtrueなら下の階層を表示、falseなら非表示-->
          <v-list-group
            v-for="nav_list in navList"
            :key="nav_list.name"
            :prepend-icon="nav_list.icon"
            no-action
            :append-icon="nav_list.lists ? undefined : ''"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(list, index) in nav_list.lists" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ list }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar
      color
      dark
      app
      clipped-left
      src="/christian-holzinger-CUY_YHhCFl4-unsplash.jpg"
    >
      <!-- ハンバーガーメニュー -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <a href="/protected" style="text-decoration: none; color: white;">
          Sample App
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-account</v-icon>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn color="white" style="text-transform: none;">
                    <v-icon>mdi-account</v-icon>
                    <nuxt-link
                      :to="{ name: 'protected-id', params: { id: uid } }"
                      style="text-decoration: none; color: black;"
                    >
                      Profile
                    </nuxt-link>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn
                    v-if="uid"
                    text
                    style="text-transform: none;"
                    @click="signOut"
                  >
                    <v-icon>mdi-logout</v-icon>
                    Sign out
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <nuxt />
    <v-footer dark app>Vuetify</v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

interface Data {
  drawer: boolean
  navList: any[]
}
export default Vue.extend({
  name: 'Protected',
  middleware: 'authenticated',
  data(): Data {
    return {
      drawer: false,
      navList: [
        {
          name: 'Getting Started',
          icon: 'mdi-vuetify',
          lists: ['Quick start', 'Pre-mode layouts'],
        },
      ],
    }
  },
  computed: {
    uid(): string {
      return this.$store.state.user.uid
    },
  },
  methods: {
    async signOut(): Promise<void> {
      await this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/auth/signin')
      })
    },
  },
})
</script>
