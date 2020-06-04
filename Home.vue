<template>
  <v-container>
        <v-row
          align="center"
          justify="center"
        >
          <v-col align="center"
          justify="center">
            <v-btn class="mx-2" @click="buttonClicked = 'add' ">Добавить</v-btn>
            <v-btn class="mx-2" @click="buttonClicked = 'byphone'">По телефону</v-btn>
            <v-btn class="mx-2" @click="buttonClicked = 'byname'" >По сотруднику</v-btn>
          </v-col>
        </v-row>

        <v-form v-if="buttonClicked === 'add'">

          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-text-field v-model="newEmp.name" label="ФИО" placeholder="Фамилия Имя Отчество"></v-text-field>
            </v-col>
          </v-row>
        
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-text-field v-model="newEmp.oper" label="Код оператора" placeholder="928"></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-text-field v-model="newEmp.phone" label="Номер телефона" placeholder="1110201"></v-text-field>
            </v-col>
          </v-row>

          <v-btn class="mx-2 success" @click="AddEmployment()">Сохранить</v-btn>


        </v-form>

        <v-form v-if="buttonClicked === 'byname'">

          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-text-field v-model="newEmp.name" label="ФИО" placeholder="Фамилия Имя Отчество"></v-text-field>
            </v-col>
          </v-row>

          <v-btn class="mx-2 success" @click="FindByName()">Найти</v-btn>


        </v-form>

        <v-form v-if="buttonClicked === 'result'">

          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-text-field disabled v-model="findEmp.name" label="ФИО" placeholder="Фамилия Имя Отчество"></v-text-field>
            </v-col>
          </v-row>
        
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-text-field disabled v-model="findEmp.oper" label="Код оператора" placeholder="928"></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-text-field disabled v-model="findEmp.phone" label="Номер телефона" placeholder="1110201"></v-text-field>
            </v-col>
          </v-row>

        </v-form>

        <v-form v-if="buttonClicked === 'byphone'">
        
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-text-field v-model="newEmp.oper" label="Код оператора" placeholder="928"></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-text-field v-model="newEmp.phone" label="Номер телефона" placeholder="1110201"></v-text-field>
            </v-col>
          </v-row>

          <v-btn class="mx-2 success" @click="FindByPhone()">Найти</v-btn>
  
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
         <div style="border: 2px solid gray">
          Данный раздел отвечает за добавление новых сотрудников в базу данных, а также за поиск сотрудников в базе по параметрам ФИО или номер телефона и код оператора.
        Чтобы добавить нового сотрудника в БД, необходимо нажать на "Добавить", заполнить формы и нажать "Сохранить".
        Для поиска номера телефона сотрудника по ФИО, необходим нажать на "По сотруднику", заполнить формы и нажать "Найти".
        Тоже самое для поиска сотрудника по номеру телефона и коду оператора, необходимо нажать "По телефону", заполнить формы и нажать "Найти" 
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
    findEmp: {
      name: '',
      oper: '',
      phone: '',
    },
    snackbar: false,
    snackbarText: '',
  }),
  components: {
    // HelloWorld
  },
  methods: {
    AddEmployment () {
      this.buttonClicked = '';
      window.fetch('http://localhost:8090/addemploy', {
        method: 'POST',
        credentials: 'include',
         headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(this.newEmp),
      }).then(resp => {
        resp.json().then( json => {
          if (json.status) {
            this.snackbar = true;
            this.snackbarText = 'Сотрудник успешно добавлен';
            this.buttonClicked = '';
            this.newEmp = {
              name: '',
              oper: '',
              phone: '',
            }
          }
        })
      })
    },
    FindByPhone () {
      this.buttonClicked = 'result';
      window.fetch('http://localhost:8090/getbyphone', {
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
            this.snackbarText = 'Пользователь найден';
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
    FindByName () {
      this.buttonClicked = 'result';
      window.fetch('http://localhost:8090/getbyname', {
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
            this.snackbarText = 'Пользователь найден';
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
