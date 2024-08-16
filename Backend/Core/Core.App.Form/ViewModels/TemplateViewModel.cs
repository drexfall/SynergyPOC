using System.ComponentModel;
using System.Windows.Input;
using CommunityToolkit.Mvvm.Input;
using Core.App.Form.Models;

namespace Core.App.Form.ViewModels
{
    public class TemplateViewModel : BaseModel
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Code { get; set; }
        public string Json { get; set; }
        public string DataJson { get; set; }
        public string Description { get; set; }
        public string Html { get; set; }
    }
    // public class FormTemplateViewModel : INotifyPropertyChanged
    // {
    //     private string _name = "";
    //     public string Name
    //     {
    //         get => _name;
    //         set
    //         {
    //             _name = value;
    //             OnPropertyChanged(nameof(Name));
    //         }
    //     }
    //
    //     public ICommand AddTaskCommand { get; }
    //
    //     public FormTemplateViewModel()
    //     {
    //         AddTaskCommand = new RelayCommand(Create);
    //     }
    //
    //     private void Get()
    //     {
    //         
    //     }
    //     private void Create()
    //     {
    //         // Logic to add task
    //     }
    //     public event PropertyChangedEventHandler? PropertyChanged;
    //
    //     protected virtual void OnPropertyChanged(string propertyName)
    //     {
    //         PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    //     }
    // }
    
}