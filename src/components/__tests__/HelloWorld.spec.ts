import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";
import HelloWorld from "../HelloWorld.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrsrcer = mount(HelloWorld, { props: { msg: "Hello Vitest" } });
    expect(wrsrcer.text()).toContain("Hello Vitest");
  });
});
