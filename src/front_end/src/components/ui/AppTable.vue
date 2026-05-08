<template>
  <div class="table-responsive">
    <table class="app-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row[idField]">
          <td v-for="column in columns" :key="column.key">
            <slot :name="column.key" :row="row">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  idField: {
    type: String,
    default: "id"
  }
});
</script>

<style scoped>
.app-table th,
.app-table td {
  padding: 14px 12px;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  font-size: 0.94rem;
}

.app-table th {
  color: var(--color-text-soft);
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.app-table tbody tr:hover {
  background: rgba(248, 244, 240, 0.8);
}
</style>

