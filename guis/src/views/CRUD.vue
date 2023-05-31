<template>
  <h1>CRUD Page</h1>
  <div><input v-model="prefix" placeholder="Filter prefix"></div>

  <select size="5" v-model="selected">
    <option v-for="name in filteredNames" :key="name">{{ name }}</option>
  </select>

  <label>Name: <input v-model="first"></label>
  <label>Surname: <input v-model="last"></label>

  <div class="buttons">
    <button @click="create">Create</button>
    <button @click="update">Update</button>
    <button @click="del">Delete</button>
  </div>

  <div class="criteria">
    Criteria:
    <ul>
      <li class="yes">Build a frame containing the following elements: Prefix, name & surname textfields with labels; List box; Create, update & delete buttons.</li>
      <li class="yes">The list box presents a view of the data in the database that consists of a list of names.
</li>
      <li class="yes">At most one entry can be selected in the box at a time.
</li>
      <li class="yes">By entering a string into the prefix textfield, the user can filter the names whose surname start with the entered prefix (this should happen immediately without having to submit the prefix with enter).
</li>
      <li class="yes">Clicking the create button will append the resulting name from concatenating the strings in the name & surname textfields to the list box.
</li>
      <li class="yes">The update and delete buttons are enabled if an entry in the list box is selected. In contrast to the create button, the update button will not append the resulting name but instead replace the selected entry with the new name.
</li>
      <li class="yes">The delete button will remove the selected entry.
</li>
      <li class="yes">The list box must occupy all the remaining space.
</li>
    </ul>
  </div>
</template>


<script>
export default {
  data() {
    return {
      names: ['Aaa, Aaa', 'Bbb, Bbbb', 'Ccc, Ccc'],
      selected: '',
      prefix: '',
      first: '',
      last: ''
    }
  },
  computed: {
    filteredNames() {
      return this.names.filter((n) =>
        n.toLowerCase().startsWith(this.prefix.toLowerCase())
      )
    }
  },
  watch: {
    selected(name) {
      ;[this.last, this.first] = name.split(', ')
    }
  },
  methods: {
    create() {
      if (this.hasValidInput()) {
        const fullName = `${this.last}, ${this.first}`
        if (!this.names.includes(fullName)) {
          this.names.push(fullName)
          this.first = this.last = ''
        }
      }
    },
    update() {
      if (this.hasValidInput() && this.selected) {
        const i = this.names.indexOf(this.selected)
        this.names[i] = this.selected = `${this.last}, ${this.first}`
      }
    },
    del() {
      if (this.selected) {
        const i = this.names.indexOf(this.selected)
        this.names.splice(i, 1)
        this.selected = this.first = this.last = ''
      }
    },
    hasValidInput() {
      return this.first.trim() && this.last.trim()
    }
  }
}
</script>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
}

select {
  float: left;
  margin: 0 1em 1em 0;
  width: 14em;
}

.buttons {
  clear: both;
}

button + button {
  margin-left: 5px;
}
</style>