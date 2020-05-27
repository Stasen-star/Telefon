<template>
  <v-container>
        <v-row
          align="center"
          justify="center"
        >
          <v-col align="center"
          justify="center">
            <v-btn class="mx-2" @click="buttonClicked = 'byoper'" >По оператору</v-btn>
          </v-col>
        </v-row>

        <v-form v-if="buttonClicked === 'byoper'">
        
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-text-field v-model="newEmp.oper" label="Код оператора" placeholder="928"></v-text-field>
            </v-col>
          </v-row>

          <v-btn class="mx-2 success" @click="FindByOper()">Сохранить</v-btn>


        </v-form>

        <v-form v-if="buttonClicked === 'result'">

          <v-row  align="center"
          justify="center">
            <v-col class="my-2" v-for="emp in findEmp" v-bind:key="emp.phone">
              <v-card
          >
            <v-card-text>
              <p class="display-1 text--primary">
                {{emp.name}}
              </p>
              <p>Оператор: {{emp.oper}}</p>
              <div class="text--primary">
               Телефон: {{emp.phone}}
              </div>
            </v-card-text>
          </v-card>
            </v-col>
          </v-row>

        </v-form>

        <div class="text-center ma-2">
          <v-snackbar
            v-model="snackbar"
          >
            {{ snackbarText }}
            <v-btn
              color="pink"
              text
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        </div>

  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data: () => ({
    buttonClicked: '',
    newEmp: {
      name: '',
      oper: '',
      phone: '',
    },
    findEmp: [],
    snackbar: false,
    snackbarText: '',
  }),
  components: {
    // HelloWorld
  },
  methods: {
    FindByOper () {
      this.buttonClicked = 'result';
      window.fetch('http://localhost:8090/getbyoper', {
        method: 'POST',
        credentials: 'include',
         headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(this.newEmp),
      }).then(resp => {
        resp.json().then( json => {
          if (json) {
            this.snackbar = true;
            this.snackbarText = `Найдено пользователей: ${json.length}`;
            this.findEmp = json;
            this.newEmp = {
              name: '',
              oper: '',
              phone: '',
            }
          }
        })
      })
    },
  }
}
</script>
