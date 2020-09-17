<script>
  // your script goes here
</script>

<style type="text/scss">
  @import "../scss/variables";

  .subscriptionHero {
    padding: 2.25rem 2.5rem;
    background-image: url(#{$assetsUrl}backgrounds/earth_L.jpg);
    background-color: #851d34;
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
    h2 {
      color: white;
      font-family: "NespressoLucas-light", Arial, Helvetica, sans-serif;
      font-weight: normal;
      font-size: 1.125rem;
      letter-spacing: 1.5px;
      line-height: 2rem;
      text-align: center;
      margin: 0.875rem auto 1.375rem;
    }
    button {
      font-size: 0.875rem;
      font-family: "NespressoLucas-bold", Arial, Helvetica, sans-serif;
      letter-spacing: 1px;
      line-height: 1.3125rem;
      text-align: center;
      background-color: #3d8705;
      border-radius: 4px;
      color: white;
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
      border: none;
      padding: 0.625rem;
      max-width: 100%;
      min-width: 280px;
    }
  }
  .subscriptionHero__machine {
    width: 80%;
  }
  .subscriptionHero__points {
    margin: 0 auto;
    display: table;
    list-style: none;
    text-align: left;
    font-family: "NespressoLucas-light", Arial, Helvetica, sans-serif;
    font-size: 1.125rem;
    font-weight: normal;
    letter-spacing: 1px;
    line-height: 1.5rem;
    margin-bottom: 1.5rem;
  }
</style>

<section
  id="hero"
  data-label="Subscription by Nespresso"
  class="subscriptionHero">
  <img
    class="g_visual g_imgSrc g_imgSrc_loaded"
    aria-hidden="true"
    src="/images/logo_subscription.svg"
    alt="Subscription by Nespresso" />
  <h2>Never run out of coffee</h2>
  <img
    class="subscriptionHero__machine"
    src="/images/machine.png"
    alt="Coffee Machine Set" />
  <ul class="subscriptionHero__points">
    <li>Your machine for <strong>$1</strong></li>
    <li>
      <strong>Monthly credit</strong> to spend on all coffees and accesories
    </li>
    <li><strong>Unlimited</strong> free deliveries</li>
  </ul>
  <button>SEE ALL MACHINES</button>
</section>
