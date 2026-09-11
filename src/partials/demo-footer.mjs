export default (ctx) => `
<script src="${ctx.root}assets/js/site.js" defer></script>
<script src="${ctx.root}assets/js/demos/common.js" defer></script>
${ctx.extraJs ? `<script src="${ctx.root}${ctx.extraJs}" defer></script>` : ''}
</body>
</html>`;
