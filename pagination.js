export default {
  props: ['pages', 'getProducts()'],
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
      <li class="page-item" >
          {{pages}}
          <a class="page-link" href="#" aria-label="Previous" >
              <span aria-hidden="true">&laquo;</span>
          </a>
      </li>
      <li class="page-item" v-for="page in pages.total_pages"><a class="page-link" href="#" @click="getProducts(page = page)">{{page}}</a></li>
      <li class="page-item" :class="{}">
          <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
          </a>
      </li>
  </ul>
</nav>
</div>`,
};