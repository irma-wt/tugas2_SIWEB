$(document).ready(function () {

  /* ===== CUSTOM ALERT ===== */
  function showAlert(msg, callback) {
    $('#custom-alert-msg').text(msg);
    $('#custom-alert-overlay').addClass('show');
    $('#custom-alert-btn').off('click').on('click', function () {
      $('#custom-alert-overlay').removeClass('show');
      if (typeof callback === 'function') callback();
    });
  }

  /* ===== SHOW PAGE ===== */
  function showPage(id) {
    $('.page').removeClass('active-page');
    $('.nav-link').removeClass('active-link');
    $('#' + id).addClass('active-page');
    if (id === 'page-home')       $('#btn-home').addClass('active-link');
    if (id === 'page-menu')       $('#btn-menu').addClass('active-link');
    if (id === 'page-calculator') $('#btn-calculator').addClass('active-link');
  }

  /* ===== HITUNG TOTAL ===== */
  function hitungTotal() {
    var total = 0;
    $('.qty-input').each(function () {
      total += (parseInt($(this).data('price')) || 0) * (parseInt($(this).val()) || 0);
    });
    var diskon = total > 50000 ? total * 0.1 : 0;
    var bayar  = total - diskon;
    $('#jumlah-total').val(total);
    $('#diskon').val(diskon);
    $('#jumlah-bayar').val(bayar);
  }

  /* ===== BIND MENU EVENTS ===== */
  function bindMenuEvents() {
    $('.qty-input').off('input change').on('input change', hitungTotal);
    $('#btn-reset-menu').off('click').on('click', function () {
      $('.qty-input').val(0);
      hitungTotal();
    });
    hitungTotal();
  }

  /* ===== NAV: HOME ===== */
  $('#btn-home').on('click', function (e) {
    e.preventDefault();
    showPage('page-home');
  });

  /* ===== NAV: MENU ===== */
  $('#btn-menu').on('click', function (e) {
    e.preventDefault();
    showAlert('Input Jumlah Pesanan agar di hitung otomatis oleh sistem', function () {
      bindMenuEvents();
      showPage('page-menu');
    });
  });

  /* ===== NAV: CALCULATOR ===== */
  $('#btn-calculator').on('click', function (e) {
    e.preventDefault();
    showPage('page-calculator');
  });

  /* ===== SHOUT ===== */
  $('#btn-shout').on('click', function () {
    showAlert('Hai, Selamat datang di Sistem Sederhana');
  });

  /* ===== HITUNG KALKULATOR ===== */
  $('#btn-hitung').on('click', function () {
    var v1 = $('#calc-num1').val().trim();
    var v2 = $('#calc-num2').val().trim();
    if (v1 === '' || v2 === '') {
      showAlert('inputan pertama dan kedua harus lebih dari 0');
      return;
    }
    var n1 = parseFloat(v1), n2 = parseFloat(v2);
    var op = $('#calc-op').val();
    var hasil;
    if      (op === '+') hasil = n1 + n2;
    else if (op === '-') hasil = n1 - n2;
    else if (op === '*') hasil = n1 * n2;
    else if (op === '/') {
      if (n2 === 0) { showAlert('Pembagi tidak boleh 0'); return; }
      hasil = n1 / n2;
    }
    else if (op === '%') hasil = n1 % n2;
    else if (op === '^') hasil = Math.pow(n1, n2);
    $('#calc-result').val(hasil);
  });

  /* ===== RESET KALKULATOR ===== */
  $('#btn-reset-calc').on('click', function () {
    $('#calc-num1, #calc-num2, #calc-result').val('');
    $('#calc-op').val('*');
  });

  /* Init */
  showPage('page-home');
});