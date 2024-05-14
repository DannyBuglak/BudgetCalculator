using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace BudgetCalculator.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BudgetController : ControllerBase
    {
        private static readonly List<Expense> Expenses = new List<Expense>();

        [HttpGet]
        public IEnumerable<Expense> Get() => Expenses;

        [HttpPost]
        public IActionResult Post([FromBody] Expense expense) { 
            Expenses.Add(expense);
            return Ok(expense);
        }
    }

    public class Expense
    {
        public string Name { get; set; }
        public decimal Amount { get; set;}
    }
}
