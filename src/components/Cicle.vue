<template>
  <div
    class="absolute rounded-full pointer-events-none -z-20"
    :style="circleStyle"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

type EdgePosition = string | undefined;

interface BgCircleProps {
  size?: number;
  color?: string;
  top?: EdgePosition;
  left?: EdgePosition;
  right?: EdgePosition;
  bottom?: EdgePosition;
  blur?: boolean;
  opacity?: number;
}

const props = withDefaults(defineProps<BgCircleProps>(), {
  size: 200,
  color: "rgba(37,99,235,0.4)",
  blur: false,
  opacity: 1,
});

const circleStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  background: props.color,
  top: props.top,
  left: props.left,
  right: props.right,
  bottom: props.bottom,
  opacity: props.opacity,
  filter: props.blur ? "blur(20px)" : "none",
  zIndex: 0,
}));
</script>
