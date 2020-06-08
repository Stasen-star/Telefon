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

        <v-form v-if="buttonClicked === 'add'" ref="form" v-model="valid" lazy-validation>

          <v-row align="center" justify="center" >
            <v-col align="center" justify="center">
              <v-text-field :rules="nameRules" v-model="newEmp.name" required label="ФИО" @change="validate()" placeholder="Фамилия Имя Отчество"></v-text-field>
            </v-col>
          </v-row>
        
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-text-field :rules="operatorRules" v-model="newEmp.oper" required label="Код оператора" @change="validate()" placeholder="928"></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-text-field :rules="phoneRules" v-model="newEmp.phone" required label="Номер телефона" @change="validate()" placeholder="1110201"></v-text-field>
            </v-col>
          </v-row>

          <v-btn class="mx-2 success" :disabled="!valid" @click="AddEmployment()">Сохранить</v-btn>


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

  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data: () => ({
    buttonClicked: '',
    valid: false,
    nameRules: [
      v => !!v || 'Name is required',
      v => {
        v = v.trim();
        if (!v || v.length > 50)
          return 'Name must be less than 50 characters'

        const regexp = new RegExp("[0-9]")
        if (regexp.test(v)) {
          return 'Имя не может содержать цифры'
        }
        const names = v.split(" ");
        if (names.length != 3)
          return 'ФИО необхоидмо ввести через пробелы'
        for (let i = 0; i < names.length; i++) {
          const name = names[i].trim();
          if (name.length < 2) 
            switch (i) {
                case 0:
                  return "Фамилия не может состоять из одной буквы"
                case 1:
                  return "Имя не может состоять из одной буквы"
                case 2:
                  return "Отчество не может состоять из одной буквы"
                default:
                  break;
              } 
        }

        return true;
      },
    ],
    operatorRules: [
      v => !!v || 'Operator is required',
      v => {
        if (!v || v.length != 3)
          return 'Оператор должен состоять из 3 цифр'
        const numbers = +v;
        if (isNaN(numbers) || numbers < 100 || numbers >= 1000) 
          return 'Оператор должен состоять из 3 цифр'

        return true;
      },
    ],
    phoneRules: [
      v => !!v || 'phone is required',
      v => {
        v = v.trim();
        if (!v || v.length != 7)
          return 'Номер телефона должен состоять из 7 цифр'
        const numbers = +v;
        if (isNaN(numbers) || numbers < 1000000 || numbers > 9999999) 
          return 'Номер телефона должен состоять из 7 цифр'

        return true;
      },
    ],
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
    validate () {
      this.$refs.form.validate();
    },
    AddEmployment () {
      
      if (!this.$refs.form.validate()) {
        return;
      }

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
