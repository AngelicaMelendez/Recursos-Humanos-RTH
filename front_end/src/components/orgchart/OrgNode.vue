<template>
  <li class="org-node">
    <div class="org-node__card">
      <strong>{{ node.name }}</strong>
      <span>{{ node.role }}</span>
    </div>
    <ul v-if="node.children?.length" class="org-node__children">
      <OrgNode v-for="child in node.children" :key="child.name" :node="child" />
    </ul>
  </li>
</template>

<script setup>
defineProps({
  node: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.org-node {
  list-style: none;
  text-align: center;
}

.org-node__card {
  display: inline-grid;
  gap: 6px;
  min-width: 180px;
  padding: 18px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(98, 17, 50, 0.06);
}

.org-node__card span {
  color: var(--color-text-soft);
  font-size: 0.9rem;
}

.org-node__children {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 28px 0 0;
  padding: 24px 0 0;
}

.org-node__children::before {
  content: "";
  position: absolute;
  top: 0;
  width: 2px;
  height: 16px;
  background: var(--color-accent);
}

@media (max-width: 920px) {
  .org-node__children {
    flex-direction: column;
    align-items: center;
  }
}
</style>
