export class TodoModel {
  constructor(key) {
    this.map = []
    this.key = key
    this.procedures = {
      onRemove: ({id}) => {
        this.remove(id)
      },
      onChange: ({id, key, value}) => {
        this.change(id, key, value)
      },
      onAdd: ({data}) => {
        this.push(data)
      }
    }
  }

  get storage() {
    let storage = localStorage.getItem(this.key)

    if (storage) {
      return JSON.parse(storage)
    }
    return null
  }

  set storage(data) {
    localStorage.setItem(this.key, JSON.stringify(data))
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.map))
  };

  push({data}) {
    this.map.push(data)
    this.save()
  }

  change(id, key, value) {
    this.map[id][key] = value
    this.save()
  }

  remove(id) {
    this.map.splice(id, 1)
    this.save()
  }
}
